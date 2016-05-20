## aframe-firebase-component

> Learn [how to get started with Firebase](https://firebase.google.com/docs/web/setup).

A Firebase component for [A-Frame](https://aframe.io).

Comes with a Firebase broadcast component for multiuser experiences
out-of-the-box by syncing entities' component data to Firebase realtime
database. The parent-child relationships between entities are maintained as
well as long as all entities in the hierarchy have the `broadcast` component
attached.

To deploy with GitHub pages when setting up Firebase with the [Firebase
Console](https://firebase.google.com/console/), go into *Auth*, and add your
GitHub pages domain (e.g., `ngokevin.github.io`). This will whitelist your
domain.

If your scene allows unauthenticated users (most should), then go into
*Database*, click on *Rules*, and set both the `.read` and `.write` to `true`.

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

| Property   | Description                                          | Default Value      |
| --------   | -----------                                          | -------------      |
| components | List of comma-delimited component names to broadcast | position, rotation |

### Accessing the Firebase Object

You can access the Firebase object:

```js
document.querySelector('a-scene').systems.firebase.firebase
```

If you wanted to add game logic or features such as chat.

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
    <a-assets>
      <!-- Using mixins to decrease amount of data send over the wire. -->
      <a-mixin id="avatar-head"
              geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.3"
              material="color: #222"></a-mixin>
    </a-assets>

    <a-entity id="avatar" mixin="avatar-head"
              camera look-controls wasd-controls
              firebase-broadcast="components: mixin, position, rotation"
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
