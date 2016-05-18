## aframe-firebase-component

> Learn [how to get started with Firebase](https://firebase.google.com/docs/web/setup).

A Firebase component for [A-Frame](https://aframe.io).

### Properties

Configure the Firebase system through `<a-scene>`.

| Property      | Description                     |
| --------      | -----------                     |
| apiKey        | API key for Firebase.           |
| authDomain    | Firebase authentication domain. |
| databaseURL   | Firebase database URL.          |
| storageBucket | Firebase storage bucket URL.    |

### Usage

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-firebase-component/master/dist/aframe-firebase-component.min.js"></script>
</head>

<body>
  <a-scene firebase="apiKey: abc;
                     authDomain: mysite.firebaseapp.com;
                     databaseURL: https://mysite.firebaseio.com;
                     storageBucket: mysite.appspot.com">
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-firebase-component
```

Then register and use.

```js
require('aframe');
require('aframe-firebase-component');
```
