import React ,{useState, useEffect} from 'react'
import axios from 'axios';

export default function Sportsdata() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
  
    useEffect(() => {
      axios.get('http://localhost:3001/api/sportsdata')
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
        console.log(data);
      return <div>Error: {error.message}</div>;
      
    }


    return (
        //want data to be displayed here in a table
        <div>
            <h1>Game Schedule</h1>

            <table>
                <thead>
                    <tr>
                        <th>Home Team</th>
                        <th>vs</th>
                        <th> Away Team</th>
                        <th>Game Date</th>
                        <th>Match Link</th>
                    </tr>
                </thead>
                <tbody>
                {data.games.filter(game => game.broadcasts.filter(broadcast =>  broadcast.network.startsWith('B'))[0] !== undefined).map(game => (
                    <tr key={game.id}>
                        <td>{game.home.name} </td>
                        <td>vs</td>
                        <td>{game.away.name}</td>
                        <td>{game.scheduled}</td>
                        <td><a href={`https://www.ballysports.com/nhl/schedule/${year}/match/${game.sr_id.replace(/[^0-9]/g, '')}`} target="_blank" rel='noopener noreferrer'>Match Link</a></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
