import socketio

connected_sockets = []


def initializeSocket(app):
    print("Initializing Socket.IO")
    # Create a Socket.IO server
    sio = socketio.AsyncServer(async_mode="asgi")
    socket_app = socketio.ASGIApp(sio, app)

    # Socket.IO event handlers
    @sio.on('connect')
    async def connect(sid, environ):
        global connected_sockets
        connected_sockets.append(sid)
        print(f"User connected: {sid}")

    @sio.on('disconnect')
    async def disconnect(sid):
        global connected_sockets
        connected_sockets.remove(sid)
        print(f"User {sid} disconnected")

    @sio.on("ping-server")
    async def ping_server(sid, payload):
        print("ping", payload)

    return socket_app
