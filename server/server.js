const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cut-object', async (req, res) => {
    const { img, prompt } = req.body;
  
    try {
      const { Client } = await import('@gradio/client');
      const client = await Client.connect('finegrain/finegrain-object-cutter');
      const result = await client.predict('/on_change_prompt', { img, prompt });
  
      res.json(result.data);
    } catch (error) {
      console.error('Error al conectarse a Gradio:', error);
      res.status(500).send('Error al conectarse a Gradio.');
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
