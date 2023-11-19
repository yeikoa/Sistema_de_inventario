export const EmailTemplate = ({ firstName, codigo }) => {
  const emailStyles = {
    body: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#e6e6ff', 
      color: '#333333',
      lineHeight: '1.5',
      padding: '40px 20px', 
      textAlign: 'center',
    },
    container: {
      backgroundColor: '#ffffff',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
    },
    heading: {
      color: '#1e40af',
      fontSize: '28px', 
      fontWeight: '600', 
      marginBottom: '20px', 
    },
    text: {
      color: '#2c5282', 
      fontSize: '16px',
      marginBottom: '30px', 
    },
    code: {
      fontFamily: 'Courier, monospace', 
      backgroundColor: '#dbeafe', 
      color: '#1e40af',
      padding: '20px', 
      borderRadius: '6px',
      display: 'inline-block',
      fontSize: '24px', 
      fontWeight: '700',
      marginBottom: '30px', 
    },
    footer: {
      fontSize: '12px',
      color: '#9aa5b1', 
      marginTop: '30px', 
    },
  };

  return (
    <div style={emailStyles.body}>
      <div style={emailStyles.container}>
        <h1 style={emailStyles.heading}>¡Hola, {firstName}!</h1>
        <p style={emailStyles.text}>
          Utiliza el siguiente código para completar tu proceso de verificación:
        </p>
        <div style={emailStyles.code}>{codigo}</div>
        <p style={emailStyles.footer}>
          Si no solicitaste este código, por favor ignora este correo.
        </p>
      </div>
    </div>
  );
};
