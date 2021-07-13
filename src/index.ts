import App from './App';

function startApp() {
  Promise.resolve()
    .then(() => {
      const app = new App();
      app.start();
    });
}

startApp();
