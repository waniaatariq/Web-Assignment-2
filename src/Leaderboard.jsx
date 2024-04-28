import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leaderboard.css';

const LeaderboardComponent = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboards');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getTrophyImage = (rank) => {
    switch (rank) {
      case 1:
        return `${process.env.PUBLIC_URL}/assets/gold.png`;
      case 2:
        return `${process.env.PUBLIC_URL}/assets/silver.jpg`;
      case 3:
        return `${process.env.PUBLIC_URL}/assets/bronze.jpg`;
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Total Games Played</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team, index) => (
            <tr key={index}>
              <td>
                {getTrophyImage(team.rank) ? (
                  <img
                    src={getTrophyImage(team.rank)}
                    alt={`Rank ${team.rank}`}
                    className="trophy"
                  />
                ) : (
                  <span>{team.rank}</span>
                )}
              </td>

              <td>
                <div className="avatar-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/${team.avatar}`}
                    alt={team.team}
                    className="avatar"
                  />
                  <span className="team-name">{team.team}</span>
                </div>
              </td>
              <td>{team.gamesplayed}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardComponent;
