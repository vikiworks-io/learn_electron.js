#### PACKAGING ELECTRON APPLICATION FOR ALL PLATFORM

My development machine is mac. [for other systems steps may slightly vary]

###### SIMPLE WAY
    1. cd packaging/app
    2. brew install yarn
    3. ./package.sh


###### LITTLE DETAILED WAY
    1. Enter the application directory [the directory should contains package.json]
        $cd packaging/app
    2. Install yarn package manager
        $brew install yarn
    3. Clean unnessary files (if any)
        $rm -rf yarn.lock package-lock.json node_modules
    4. Check whether icon.icns present [ This icon is the application icon for mac/linux ]
        $ls build/icon.icns  
    5. Check whether background.png present [ This icon is the dmg file background for mac ]
        $ls build/background.png
    6. Check whether icon.ico present  [ This icon is the application icon for windows ]
        $ls build/icon.ico
    7. In package.json add the following
        "scripts": {
            "pack": "electron-builder --dir",
            "dist": "electron-builder -mwl",
            "start": "electron ."
        },
        "build": {
            "appId": "com.app.com",
            "mac": {
                "category": "com.app.com.category",
                "icon" : "build/icon.icns"
            },
            "win":{
                "icon" : "build/icon.ico"
            }
        },

    8. Install electron-builder to package application
            $yarn add electron-builder --dev 
    9. Install all packages from package.json
            $yarn install
    10. Build Package(Compile)
            $yarn dist
    11. Now you can see the packages created under the following directory
            $ls dist/
    12. MAC PACKAGE     : 'dist/app-1.0.0.dmg'       |  'dist/mac/app.app'
    13. WINDOWS PACKAGE : 'dist/app Setup 1.0.0.exe' | 'dist/win-unpacked/app.exe'
    14. LINUX PACKAGE   : 'dist/app-1.0.0.dmg'

###### Application Icon Recommendations

	1. Mac expects icon to be in icon.icns format of size 512x512
    2. Windows expects icon to be in icon.ico format of size 256x256
    3. Mac dmg background icons should be in .png format with name "background.png" under build directory


#### USEFUL LINKS


######  MAC package.json additional options

https://www.electron.build/configuration/mac

https://www.electron.build/configuration/pkg
https://www.electron.build/configuration/mas
https://www.electron.build/configuration/dmg


###### WINDOWS package.json additional options

https://www.electron.build/configuration/win

https://www.electron.build/configuration/nsis

###### LINUX package.json additional options
https://www.electron.build/configuration/linux

https://www.electron.build/configuration/linux#de
https://www.electron.build/configuration/linux#LinuxTargetSpecificOptions

https://github.com/electron-userland/electron-builder

