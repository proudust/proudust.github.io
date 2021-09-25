---
title: WPF アプリケーションに .Net Generic Host 使ってみる
emoji: ⚙️
topics: [csharp]
type: tech
published: true

qrunch: https://proudust.qrunch.io/entries/0b9bWiudpmPy8bpC
---

ちょっと気になったので調べたら↓の 2 通りの方法があったので書いておく。  
ぶっちゃけ使う理由あんまり無いので大人しく Prism 使ったほうが良いと思うよ。  

1. WPF のライフサイクルに合わせて Generic Host を動かす
2. `Dapplo.Microsoft.Extensions.Hosting.Wpf` を使って Generic Host から WPF を動かす

## 1. WPF のライフサイクルに合わせて Generic Host を動かす

`Application` を継承したクラスで `IHost` を作成し、各イベントに合わせて `IHost` を動かしたり止めたりする。  
`Generic Host` の DI 機能を使ってウィンドウを作成したいので XAML 側の `StartupUri` 属性は削除しておこう。  
参考: [WPF and .NET Generic Host with .NET Core 3.0 - Laurent Kempé](https://laurentkempe.com/2019/09/03/WPF-and-dotnet-Generic-Host-with-dotnet-Core-3-0/)  

```cs
public partial class App : Application
{
    private readonly IHost _Host = Host.CreateDefaultBuilder()
        .ConfigureServices((context, services) =>
        {
            services.AddSingleton<MainWindow>();
        })
        .Build();

    protected override async void OnStartup(StartupEventArgs e)
    {
        await _Host.StartAsync();
        _Host.Services.GetRequiredService<MainWindow>().Show();
        base.OnStartup(e);
    }

    protected override async void OnExit(ExitEventArgs e)
    {
        await _Host.StopAsync(TimeSpan.FromSeconds(5));
        _Host.Dispose();
        base.OnExit(e);
    }
}
```

## 2. `Dapplo.Microsoft.Extensions.Hosting.Wpf` を使って Generic Host から WPF を動かす

[`Dapplo.Microsoft.Extensions.Hosting.Wpf`](https://github.com/dapplo/Dapplo.Microsoft.Extensions.Hosting) をインストールすると生える `HostBuilder#ConfigureWpf` と `HostBuilder#UseWpfLifetime` を使えば Generic Host から WPF を動かすことができる。  
最初に表示するウィンドウに `IWpfShell` を実装していないと何も表示されないので注意。  
また `App` クラスの名前を変えないと、新しく作った方の `Main` をエントリーポイントとして認識してくれないっぽいので注意。  

```cs
public static class Program
{
    public static async Task Main()
    {
        await new HostBuilder()
            .ConfigureWpf(builder =>
            {
                builder.UseApplication<WpfApp>();
                builder.UseWindow<MainWindow>();
            })
            .UseWpfLifetime()
            .Build()
            .RunAsync();
    }
}
```
