const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  database: async () => {
    try {
      // Verifica la conexión a la base de datos con una consulta simple
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Conexión a la base de datos establecida');
      return prisma;
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
      throw error;
    }
  },
  
  // Puedes agregar más configuraciones aquí
  // Por ejemplo, configuración de JWT, ruta de archivos, etc.
};