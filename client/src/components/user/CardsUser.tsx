

const CardsUser = () => {
  const cards = [
    {
      name: "Karthik P",
      cardNumber: "4642 3489 9867 7632",
      validDate: "11/15",
      expiryDate: "03/25",
      cvv: "···",
      backgroundImage: "https://i.imgur.com/Zi6v09P.png",
      avatarImage: "https://i.imgur.com/bbPHJVe.png",
    },
    {
      name: "Karthik P",
      cardNumber: "4642 3489 9867 7632",
      validDate: "11/15",
      expiryDate: "03/25",
      cvv: "···",
      backgroundImage: "https://i.imgur.com/kGkSg1v.png",
      avatarImage: "https://i.imgur.com/bbPHJVe.png",
    },
    
  ];

  return (
    <div className="overflow-x-auto flex gap-8 mt-10 px-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex-none w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-95"
        >
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src={card.backgroundImage}
            alt={`Card ${index}`}
          />
          <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
              <div>
                <p className="font-light">Name</p>
                <p className="font-medium tracking-widest">{card.name}</p>
              </div>
              <img
                className="w-14 h-14"
                src={card.avatarImage}
                alt={`Avatar ${index}`}
              />
            </div>
            <div className="pt-1">
              <p className="font-light">Card Number</p>
              <p className="font-medium tracking-more-wider">
                {card.cardNumber}
              </p>
            </div>
            <div className="pt-6 pr-6">
              <div className="flex justify-between">
                <div>
                  <p className="font-light text-xs">Valid</p>
                  <p className="font-medium tracking-wider text-sm">
                    {card.validDate}
                  </p>
                </div>
                <div>
                  <p className="font-light text-xs">Expiry</p>
                  <p className="font-medium tracking-wider text-sm">
                    {card.expiryDate}
                  </p>
                </div>
                <div>
                  <p className="font-light text-xs">CVV</p>
                  <p className="font-bold tracking-more-wider text-sm">
                    {card.cvv}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsUser;
