// express
app.get('/api/users', (req, res) => {
    res.json({ message: 'Get all users' });
  });
  
  app.post('/api/users', (req, res) => {
    const user = req.body;
    res.status(201).json({ message: 'User created', user });
  });
  
  // fastify
  fastify.get('/api/status', async (request, reply) => {
    return { status: 'ok' };
  });
  
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { username } = request.body as any;
    return { message: `Welcome ${username}` };
  });
  
  // nestjs
  import { Controller, Get, Post, Body } from '@nestjs/common';
  
  @Controller('users')
  export class UsersController {
    @Get()
    getAll() {
      return { message: 'Get all users' };
    }
  
    @Post()
    create(@Body() body: any) {
      return { message: 'User created', user: body };
    }
  }
  
  // koa.js
  router.get('/api/products', async (ctx) => {
    ctx.body = { message: 'List of products' };
  });
  
  router.post('/api/products', async (ctx) => {
    ctx.body = { message: 'Product created' };
  });
  
  
  // hapi.js
  const init = async () => {
  
    server.route([
      {
        method: 'GET',
        path: '/api/health',
        handler: () => ({ status: 'ok' }),
      },
      {
        method: 'POST',
        path: '/api/items',
        handler: (request) => {
          const item = request.payload;
          return { message: 'Item created', item };
        },
      },
    ]);
  
    await server.start();
    console.log('Server running on %s', server.info.uri);
  };
  
  init();
  