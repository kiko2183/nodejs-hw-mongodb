const notFoundHandler = (req, res) => {
    res.status(404).json({
      status: 'error',
      message: `${req.url} not found`,
      data: null,
    });
  };
  
  export default notFoundHandler;
  