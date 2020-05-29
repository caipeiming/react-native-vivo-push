
# react-native-vivo-push

## Getting started

`$ npm install react-native-vivo-push --save`

### Mostly automatic installation

`$ react-native link react-native-vivo-push`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import top.cpming.rn.push.vivo.RNVivoPushPackage;` to the imports at the top of the file
  - Add `new RNVivoPushPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-vivo-push'
  	project(':react-native-vivo-push').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-vivo-push/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-vivo-push')
  	```


## Usage
```javascript
import RNVivoPush from 'react-native-vivo-push';

// TODO: What to do with the module?
RNVivoPush;
```
  