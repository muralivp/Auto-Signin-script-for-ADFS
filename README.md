 
 # Auto-Signin-script-for-ADFS
This is a script for auto-signing a default user to ADFS. This may be useful in creating test scenarios for ADFS. This uses already documented features in ADFS https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/advanced-customization-of-ad-fs-sign-in-pages

## Step 1 - Create a custom theme
```powershell
New-AdfsWebTheme –Name custom –SourceName default  
Export-AdfsWebTheme –Name default –DirectoryPath c:\theme
```
## Step 2 - Modify the onload script
Copy the onload.js in this sample and replace ```<adfsServerUrl>```, ```<username>``` and ```<password>``` with the correct values. 
Please note: This is just a modified version of the default onload.js shipped with ADFS.

## Step 3 - Activate the theme
```powershell
Set-AdfsWebTheme -TargetName custom -AdditionalFileResource @{Uri=’/adfs/portal/script/onload.js’;path="c:\theme\script\onload.js"}
Set-AdfsWebConfig -ActiveThemeName custom
```
