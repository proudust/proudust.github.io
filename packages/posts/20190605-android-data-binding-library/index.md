---
title: DataBindingLibrary でソースコードから findViewById を一掃する
emoji: 🧹
topics: [android]
type: tech
published: true

createat: "2019-06-05T15:14:40+09:00"
updateat: "2019-07-06T07:27:17+09:00"
qiita: https://qiita.com/proudust/items/cf66592296814e55c5b6
---

## 概要

[*Android Jetpack*](https://developer.android.com/topic/libraries/data-binding/?hl=JA) のコンポーネントの一つ、[*Data Binding Library*](https://developer.android.com/topic/libraries/data-binding/?hl=JA) を活用し、ソースコード内から `findViewById` による View の取得を一掃した備忘録。

## 1. *Data Binding Library* を有効化する

`app/build.gradle` に `dataBinding.enabled = true` を追加する。

```groovy
android {
    // 中略
    dataBinding {
        enabled = true
    }
}
```

以上を追記

## 2. レイアウトを `<layout></layout>` で囲う

`layout/*.xml` の頭と尻に `<layout></layout>` を書き加え、`xmlns:*` だけ `<layout>` に移動する。

``` xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- レイアウト設定 -->
    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".HogeActivity">

        <!-- 中略 -->

    </androidx.constraintlayout.widget.ConstraintLayout>

</layout>
```

すると `layout/*.xml` を元に `ViewDataBinding` を継承した `*Binding` クラスが自動生成される。  
クラスの名前は xml の名前を UpperCamelCase に変換したものが使われる。  
自動生成されない場合は一回ビルドし直すと出るかも。  

## 4. Binding クラスを使用する

指定する対象によって方法が若干異なる。

### Activity の場合

`Activity.java` を下記のように編集する。

``` diff
 @Override
 protected void onCreate(@Nullable Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
-    setContentView(R.layout.activity);
+    final ActivityBinding binding = DataBindingUtil.setContentView(this, R.layout.activity);

-    final TextView textView = findViewById(R.is.text_view);
-    textView.setText("HogeFuga");
+    binding.textView.setText("HogeFuga");
```

`DataBindingUtil.setContentView` の戻り値の型に注意。（総称型のため、`ViewDataBinding` を継承しているクラスなら何でも受け取れてしまう）

### Fragment の場合 (パターン1)

`Fragment.java` を下記のように編集する。  
Binding クラスから View を生成するパターン。フィールドに Binding クラスを持つ必要があるのがイマイチか。  

``` diff
+private FragmentBinding binding;

 @Override
 public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                          @Nullable Bundle savedInstanceState) {
-    return inflater.inflate(R.layout.fragment, container, false);
+    binding = FragmentBinding.inflate(inflater, container, false);
+    return binding.getRoot();
 }

 @Override
 public void onActivityCreated(Bundle savedInstanceState) {
     super.onActivityCreated(savedInstanceState);
-    final TextView textView = findViewById(R.is.text_view);
-    textView.setText("HogeFuga");
+    binding.textView.setText("HogeFuga");
 }
```

### Fragment の場合 (パターン2)

`Fragment.java` を下記のように編集する。  
View を先に生成し、それを元に Binding インスタンスを生成するパターン。この場合はフィールドに持つ必要はない。  

``` diff
+private FragmentBinding binding;

 @Override
 public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                          @Nullable Bundle savedInstanceState) {
     return inflater.inflate(R.layout.fragment, container, false);
 }

 @Override
 public void onActivityCreated(Bundle savedInstanceState) {
     super.onActivityCreated(savedInstanceState);
-    final TextView textView = findViewById(R.is.text_view);
-    textView.setText("HogeFuga");
+    final FragmentBinding binding = FragmentBinding.bind(getView());
+    binding.textView.setText("HogeFuga");
 }
```

### RecyclerView.Adapter の場合

*RecyclerView.Adapter* に使うなら、*groupie*か*epoxy*使ったほうが *RecyclerView.ViewHolder* が不要になって良いと思う。

``` diff
 @NonNull
 @Override
 public MainViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
-    final View view = inflater.inflate(R.layout.recycler_row, parent, false);
-    return new ViewHolder(view);
+    final RecyclerViewAdapterBinding binding = RecyclerViewAdapterBinding.inflate(inflater, parent, false);
+    return new ViewHolder(binding);
 }

 @Override
 public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
     holder.bind("HogeFuga");
 }

 class ViewHolder extends RecyclerView.ViewHolder {
     @NonNull
-    private final TextView textView;
+    private final RecyclerRowBinding binding;

-    private MainViewHolder(@NonNull View view) {
-        super(view);
-        textView = view.findViewById(R.id.text_view);
+    private MainViewHolder(@NonNull RecyclerRowBinding binding) {
+        super(binding.getRoot());
+        this.binding = binding;
     }

     void bind(@NonNull String text) {
-        textView.setText(text);
+        binding.textView.setText(text);
     }
 }
```

## 気になる点

- Fragment に使う場合はパターン 1、2 のどちらが適切なのか
  - [ドキュメント](https://developer.android.com/topic/libraries/data-binding/generated-binding.html?hl=JA)を読む限りはどっちでも良さそう？
