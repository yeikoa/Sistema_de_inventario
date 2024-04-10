const { Builder, By, Key, until } = require('selenium-webdriver');

(async function loginTests() {
  const driver = new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000'); // Cambia la URL según tu aplicación

    // Simula la entrada de correo electrónico
    await driver.findElement(By.id('email')).sendKeys('tes.com');

    // Simula la entrada de contraseña
    await driver.findElement(By.id('password')).sendKeys('secretpassword', Key.RETURN);

    // Espera a que se cargue la siguiente página (por ejemplo, el dashboard)
    await driver.wait(until.titleIs('Dashboard'), 5000);

    console.log('Prueba de inicio de sesión exitosa');
  } catch (error) {
    console.error('Error en la prueba:', error);
  } finally {
    await driver.quit();
  }
})();
