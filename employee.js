// function to update employee
const updateEmployee = () => {
    connection.query('UP * FROM songs', (err, res) => {
      if (err) throw err;
      console.log(res); // Array of rows of table
      res.forEach(({ id, title, artist, genre }) => {
        console.log(`${id} | ${title} | ${artist} | ${genre}`);
      });
      // Same as:
      res.forEach(result => {
        console.log(`${result.id} | ${result.title} | ${result.artist} | ${result.genre}`);
      }) 
      console.log('-----------------------------------');
    });
  };