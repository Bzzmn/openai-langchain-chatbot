import express, { response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { chatAgent } from './6_agent.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware para servir archivos estáticos (opcional)
app.use(express.static('src/public'));

// Obtener el directorio de este módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura una ruta básica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
});


// Escucha las conexiones de los clientes
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escucha eventos personalizados
    socket.on('chat message', async (data) => {
        console.log('Mensaje: ' + data.question);

        const response = await chatAgent({ question: data.question, history: data.history });

        console.log('Respuesta: ' + response);
        // Envía el mensaje a todos los clientes conectados
        socket.emit('chat message', response);``
    });

    // Desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Configura el puerto del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
