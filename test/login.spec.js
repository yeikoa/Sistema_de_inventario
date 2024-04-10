const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Login', () => {
  it('should log in', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://eligam.vercel.app/'); 
    await driver.findElement(By.id('email-user')).sendKeys('yeiko2003@gmail.com');
    await driver.findElement(By.id('pass-user')).sendKeys('Duke2003');
    await driver.findElement(By.id('login')).click();
    await driver.sleep(5000);
    
    await driver.close();

  });
});

// (async function loginTests() {
//   const driver = new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('http://localhost:3000'); // Cambia la URL según tu aplicación

//     // Simula la entrada de correo electrónico
//     await driver.findElement(By.id('email')).sendKeys('tes.com');

//     // Simula la entrada de contraseña
//     await driver.findElement(By.id('password')).sendKeys('secretpassword', Key.RETURN);

//     // Espera a que se cargue la siguiente página (por ejemplo, el dashboard)
//     await driver.wait(until.titleIs('Dashboard'), 5000);

//     console.log('Prueba de inicio de sesión exitosa');
//   } catch (error) {
//     console.error('Error en la prueba:', error);
//   } finally {
//     await driver.quit();
//   }
// })();
