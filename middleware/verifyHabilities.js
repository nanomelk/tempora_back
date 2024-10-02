const verifyHabilities = (requiredHabilities) => {
    return (req, res, next) => {
      const user = req.user; // req.user viene del middleware verifyToken
  
      if (!user || !user.habilities) {
        return res.status(403).json({ message: 'Acceso denegado. No se encontraron habilidades.' });
      }
  
      const hasRequiredHabilities = requiredHabilities.some(hability => user.habilities.includes(hability));
  
      if (!hasRequiredHabilities) {
        return res.status(403).json({ message: 'Acceso denegado. No tienes las habilidades necesarias.' });
      }
  
      next();
    };
  };
  
  module.exports = verifyHabilities;
  