---
title: XDocument で XML 1.1 を読み込む
tags: [C#]
createat: "2020-08-21"
updateat: "2020-08-21"
qrunch:
---

[友人の手伝い](https://github.com/Ocelot1210/X4_ComplexCalculator)をしていた時にハマったのでメモ。

## 標準の XmlReader は XML 1.0 以外非対応

`XDocument.Parse(string)` や `XDocument.Load(Stream)` などのメソッドは XML 1.1 非対応。

より具体的に言うと、これらのメソッドで使用されている `XmlTextReaderImpl` は、
XML 宣言の version 属性の値が 1.0 以外の場合は例外を吐くようになっている。

```cs
XDocument.Parse(@"<?xml version=""1.1""?><root></root>");
// System.Xml.XmlException:
// 'Version number '1.1' is invalid. Line 1, position 16.'
```

Reference Source で言うと[この辺](https://referencesource.microsoft.com/#System.Xml/System/Xml/Core/XmlTextReaderImpl.cs,3458)。

## 対応策

ストリームから XML 宣言部分を飛ばして `XDocument.Load` に流すだけ。

今回は多分 UTF-8 の XML しか読み込まないので UTF-8 のみの対応。

```cs
public static XDocument Load(Stream stream, string? baseUri = null)
{
    stream = SkipXmlDeclaration(stream);
    var xmlReader = XmlReader.Create(stream, null, baseUri);
    return XDocument.Load(xmlReader);
}

private static Stream SkipXmlDeclaration(Stream stream)
{
    Span<byte> buff = stackalloc byte[58]; // XML 宣言の全属性を指定した文字数
    stream.Read(buff);

    // UTF-8 の BOM を読み飛ばす
    int seek = buff.StartsWith(Encoding.UTF8.Preamble)
        ? Encoding.UTF8.Preamble.Length
        : 0;

    // XML 宣言が省略されている場合はそのまま返す
    if (!buff.Slice(seek).StartsWith(XmlDeclaration))
    {
        stream.Position = seek;
        return stream;
    }

    // XML 宣言部分を読み飛ばす
    for (seek += 6; seek < buff.Length; seek++)
    {
        switch (buff[seek])
        {
            case (byte)'v':
                seek += 12; // skip 'version="1.x"'
                break;

            case (byte)'e':
                seek += 13; // skip 'encoding="UTF-8"'
                break;

            case (byte)'s':
                seek += 14; // skip 'standalone="no"'
                break;

            case (byte)'?':
                seek += 2;  // skip '?>'
                stream.Position = seek;
                return stream;
        }
    }
    throw new InvalidDataException();
}
```

なお XML 宣言の省略を認めず、宣言後の改行が必須になっても良い場合は `StreamReader#ReadLine` するだけで済む。

```cs
public static XDocument Load(Stream stream)
{
    using var reader = new StreamReader(stream);
    reader.ReadLine();
    return XDocument.Load(stream);
}
```
