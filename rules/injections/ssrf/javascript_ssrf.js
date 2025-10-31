// example 1
app.get('/ping', async (req, res) => {
    const target = req.query.url; // controlado por el cliente
    const resp = await fetch(target); // <-- SSRF
    const text = await resp.text();
    res.send(text);
  });
  
  
  // example 2
  import axios from 'axios';
  app.post('/fetch', async (req, res) => {
    const url: string = req.body.url;
    const response = await axios.get(url); // <-- SSRF
    res.json({ status: response.status, data: response.data });
  });
  