import "./Card.css";
import { Link } from "react-router-dom";
import { CardData } from "../../components/Card/CardData";

const Card = () => {
  return (
    <div className="card">
      <div className="card-container">
        {CardData.map((item, key) => {
          return (
            <div
              className={item.cName}
              key={key}
              style={{
                backgroundColor: `${item.backgroundColor}`,
              }}
            >
              <Link className="link" to={item.link}>
                <div className="icon">{item.icon}</div>

                <span className="title">{item.title}</span>

                <p className="description">{item.description}</p>

                <span className="difficulty">
                  Difficulty: {item.difficulty}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
