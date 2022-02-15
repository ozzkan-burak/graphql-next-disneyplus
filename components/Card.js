const Card = ({thumbnail}) => {

  console.log({thumbnail}); 

  return <img className="card" src={thumbnail} />;
};

export default Card;
