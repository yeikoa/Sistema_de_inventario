const { Builder, By } = require('selenium-webdriver');

describe('Login', () => {
  it('should log in', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://eligam.vercel.app/');
    await driver.findElement(By.id('email-user')).sendKeys('yeiko2003@gmail.com');
    await driver.findElement(By.id('pass-user')).sendKeys('Duke2003');
    await driver.findElement(By.id('login')).click();
    
    // Agregar un tiempo de espera de 5 segundos para que la página cargue completamente
    await driver.sleep(15000);
    await driver.findElement(By.xpath("//a[contains(@href,'/dashboard/registro')]")).click(); // Hacer clic en el enlace
    await driver.sleep(60000);
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
