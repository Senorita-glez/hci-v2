const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta GET para la raíz "/"
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.post('/cut-object', async (req, res) => {
  const { img, prompt } = req.body;

  try {
    // Hacer la solicitud a Gradio
    const gradioResponse = await fetch('https://finegrain.hf.space/api/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ img, prompt }),
    });

    const contentType = gradioResponse.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await gradioResponse.json();
      res.json(result);
    } else {
      const responseText = await gradioResponse.text();
      console.error('Respuesta no válida de Gradio (no es JSON):', responseText);
      res.status(500).send('Error: respuesta no válida de Gradio');
    }
  } catch (error) {
    console.error('Error al conectarse a Gradio:', error);
    res.status(500).send('Error al conectarse a Gradio.');
  }
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
