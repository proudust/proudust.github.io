---
title: Context を受け取ってファイルを読み書きするクラスをテストする
createat: "2019-04-14T09:34:26+09:00"
updateat: "2019-06-18T15:46:51+09:00"
qiita: https://qiita.com/proudust/items/cf8488e676cc892e9514
---

コンストラクタで `Context` を受け取って、`Context.openFileInput`や `Context.openFileOutput` を利用するクラスのテストコードの書き方にハマったので書いておきます。

## テスト対象のクラス

```BooleanRepository.java
public class BooleanRepository {
    static final String FILE_NAME = "BOOLEAN.txt";

    @NonNull private final Context context;

    public BooleanRepository(@NonNull Context context) { this.context = context; }

    public boolean load() throws IOException {
        try (final InputStream is = context.openFileInput(FILE_NAME);
             final InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
             final BufferedReader reader = new BufferedReader(isr)) {
            return Boolean.valueOf(reader.readLine());
        }
    }

    public void save(boolean bool) throws IOException {
        try (final OutputStream os = context.openFileOutput(FILE_NAME, Context.MODE_PRIVATE);
             final OutputStreamWriter osw = new OutputStreamWriter(os, StandardCharsets.UTF_8);
             final PrintWriter writer = new PrintWriter(osw)) {
            writer.append(bool);
        }
    }
}
```


## 結論 *Robolectric*を使う
*Robolectric*を使うことで、Android に依存するテストも JVM 上で実行することができます。

``` build.gradle
android {
    compileSdkVersion 28
    ...
    testOptions {
        unitTests {
            includeAndroidResources = true
        }
    }
}

dependencies {
    testImplementation 'androidx.test:core:1.2.0'
    testImplementation 'com.google.truth:truth:0.45'
}

```
``` BooleanRepositorySpec.java
@RunWith(RobolectricTestRunner.class)
public class MemoRepositorySpec {
    private static final boolean INPUT_BOOL = true;
    private static final String INPUT_STRING = String.valueOf(INPUT_BOOL);

    private BooleanRepository booleanRepository;
    private Context context;

    @Before
    public void setUp() {
        this.context = ApplicationProvider.getApplicationContext();
        this.booleanRepository = new BooleanRepository(context);
    }

    @Test
    public void load() throws Exception {
        final File file = new File(context.getFilesDir(), BooleanRepository.FILE_NAME);
        try (final Writer fileWriter = Files.newBufferedWriter(file.toPath(), StandardCharsets.UTF_8)) {
            fileWriter.write(INPUT_STRING);
        }

        final boolean output = booleanRepository.load();
        assertThat(output).isEqualTo(INPUT_BOOL);
    }

    @Test
    public void save() throws Exception {
        booleanRepository.save(true);

        final File file = new File(context.getFilesDir(), BooleanRepository.FILE_NAME);
        try (final FileInputStream fileInputStream = new FileInputStream(file)) {
            final byte[] readBuffer = new byte[INPUT_STRING.length()];
            fileInputStream.read(readBuffer);
            assertThat(readBuffer).isEqualTo(INPUT_STRING);
        }
    }
}
```


## 以下蛇足

### 試したこと1 `BufferedReader`と `PrintWriter` をモックする
最初にメソッド内で new している `BufferedReader` と `PrintWriter` を `PowerMock` でモックすれば良いのでは？と考えた。
しかし、`PowerMock`の使い方がわからずうまく置き換わらず断念。

### 試したこと2 `Context.openFileInput`や `Context.openFileOutput` をモックする
次に `Context.openFileInput` や `Context.openFileOutput` が `ByteArrayInputStream` 、`ByteArrayOutputStream`を返すようにモックできれば良いのでは？と考えた。
しかし `Context.openFileInput` や `Context.openFileOutput` の戻り値はそれぞれ `FileInputStream` 、`FileOutputStream`なので戻り値が合わないので無理。

### 試したこと3 `InputStream`、`OutputStream`を返すメソッドを作り、それをモックする
`InputStream`、`OutputStream`を返すメソッドを作って、

```BooleanRepository.java
    InputStream getInputStream() throws FileNotFoundException {
        return context.openFileInput(FILE_NAME);
    }

    OutputStream getOutputStream() throws FileNotFoundException {
        return context.openFileOutput(FILE_NAME, Context.MODE_PRIVATE);
    }
```

テスト対象のメソッドをそこから読み取るように変更する。

```BooleanRepository.java
        try (final InputStream is = getInputStream();
        /* ... */
        try (final OutputStream os = getOutputStream();
```

そのメソッドを `Mockito` でモックし、それぞれ `ByteArrayInputStream` 、`ByteArrayOutputStream`を返すようにする。
`ByteArrayInputStream`にはファイルの内容の byte 配列をコンストラクタに渡せる。
`ByteArrayOutputStream`なら `.toByteArray()` すると出力内容を byte[]で読み取れる。

```BooleanRepositorySpec.java
public class MemoRepositorySpec {
    private static final boolean INPUT_BOOL = true;
    private static final byte[] INPUT_BYTES = String.valueOf(INPUT_BOOL).getBypes(StandardCharsets.UTF_8);

    @Spy
    private BooleanRepository booleanRepository;
    private Context context;

    @Before
    public void setUp() {
        context = mock(Context.class);
        booleanRepository = new BooleanRepository(context);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void load() throws Exception {
        final ByteArrayInputStream is = new ByteArrayInputStream(INPUT_BYTES);
        doReturn(is).when(booleanRepository).getInputStream();

        final boolean output = booleanRepository.load();
        assertThat(output).isEqualTo(INPUT_BOOL);
    }

    @Test
    public void save() throws Exception {
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        doReturn(os).when(booleanRepository).getOutputStream();

        booleanRepository.save(true);
        assertThat(os.toByteArray()).containsExactly(INPUT_BYTES);
    }
}
```
