

const CardsUser = () => {
  return (
    <div className="bg-white flex mt-10 justify-end">
    <div className="gap-6 flex">
        {/* Orange Card */}
        <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            
            <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/Zi6v09P.png"/>
            
            <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                    <div className="">
                        <p className="font-light"/>
                            Name
                        
                        <p className="font-medium tracking-widest">
                            Karthik P
                        </p>
                    </div>
                    <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                </div>
                <div className="pt-1">
                    <p className="font-light"/>
                        Card Number
                    
                    <p className="font-medium tracking-more-wider">
                        4642  3489  9867  7632
                    </p>
                </div>
                <div className="pt-6 pr-6">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light text-xs"/>
                                Valid
                            
                            <p className="font-medium tracking-wider text-sm">
                                11/15
                            </p>
                        </div>
                        <div className="">
                            <p className="font-light text-xs "/>
                                Expiry
                            
                            <p className="font-medium tracking-wider text-sm">
                                03/25
                            </p>
                        </div>

                        <div className="">
                            <p className="font-light text-xs"/>
                                CVV
                            
                            <p className="font-bold tracking-more-wider text-sm">
                                ···
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
            {/* Blue Card */}
        <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        
        <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"/>
        
        <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
                <div className="">
                    <p className="font-light"/>
                        Name
                    
                    <p className="font-medium tracking-widest">
                        Karthik P
                    </p>
                </div>
                <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
            </div>
            <div className="pt-1">
                <p className="font-light"/>
                    Card Number
                
                <p className="font-medium tracking-more-wider">
                    4642  3489  9867  7632
                </p>
            </div>
            <div className="pt-6 pr-6">
                <div className="flex justify-between">
                    <div className="">
                        <p className="font-light text-xs"/>
                            Valid
                        
                        <p className="font-medium tracking-wider text-sm">
                            11/15
                        </p>
                    </div>
                    <div className="">
                        <p className="font-light text-xs"/>
                            Expiry
                        
                        <p className="font-medium tracking-wider text-sm">
                            03/25
                        </p>
                    </div>

                    <div className="">
                        <p className="font-light text-xs"/>
                            CVV
                        
                        <p className="font-bold tracking-more-wider text-sm">
                            ···
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
</div>
  )
}

export default CardsUser