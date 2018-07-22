# VueIntro
Vue Stuff

https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance


https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior


Home NuGet.Config is in "C:\Users\Dave\AppData\Roaming\NuGet"
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageRestore>
    <add key="enabled" value="True" />
    <add key="automatic" value="True" />
  </packageRestore>
  <packageSources>
    <add key="nuget.org" value="https://www.nuget.org/api/v2/" />
  </packageSources>
  <activePackageSource>
    <add key="nuget.org" value="https://www.nuget.org/api/v2/" />
  </activePackageSource>
  <config>
    <add key="repositoryPath" value="C:\packages" />
  </config>
  <bindingRedirects>
    <add key="skip" value="False" />
  </bindingRedirects>
  <packageManagement>
    <add key="format" value="0" />
    <add key="disabled" value="False" />
  </packageManagement>
</configuration>
