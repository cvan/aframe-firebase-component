## aframe-firebase-component

> Learn [how to get started with Firebase](https://firebase.google.com/docs/web/setup).

A Firebase component for [A-Frame](https://aframe.io).

Comes with a Firebase broadcast component for multiuser experiences
out-of-the-box by syncing entities' component data to Firebase realtime database.

### Properties

#### firebase

Firebase configuration component for `<a-scene>`.

| Property      | Description                     |
| --------      | -----------                     |
| apiKey        | API key for Firebase.           |
| authDomain    | Firebase authentication domain. |
| databaseURL   | Firebase database URL.          |
| storageBucket | Firebase storage bucket URL.    |

#### firebase-broadcast

Broadcast component data to be synced across all clients using Firebase realtime database.

### Usage

| Property   | Description                                          | Default Value      |
| --------   | -----------                                          | -------------      |
| components | List of comma-delimited component names to broadcast | position, rotation |

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
    <a-entity id="avatar"
              camera look-controls wasd-controls
              firebase-broadcast="components: geometry, material, position, rotation"
              geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.3"
              material="color: #222"
              position="0 1.8 5">
    </a-entity>
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
