import "./Leaderboard.css";

const Leaderboard = ({ difficulty, gameType, data }) => {
  console.log(data);
  return (
    <div className="game-leaderboard">
      <h1>{difficulty}</h1>

      {data &&
        data.map((item, index) => {
          return (
            <h5 key={item._id}>
              {item.user.userInfo.firstName} {item.score}
            </h5>
          );
        })}
    </div>
  );
};

export default Leaderboard;
