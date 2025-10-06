import React from 'react'
import { useEffect, useState} from 'react'
import './App.css'
import Scissors from './assets/Scissors'
import Rock from './assets/Rock'
import Paper from './assets/Paper'
import { motion } from "framer-motion"
import { useNavigate, useLocation } from 'react-router-dom'
import Lizard from './assets/Lizard'
import Spock from './assets/Spock'


function Bonus() {
    
  const [showModal, setShowModal] = useState(false);

    const [showRules, setShowRules] = useState(false)
    const [playerPick, setPlayerPick] = useState(null) // "rock", "paper", "scissors"
    const [housePick, setHousePick] = useState(null)
    const [result, setResult] = useState(null)
    const [score, setScore] = useState(() => {
      const storedScore = localStorage.getItem('rps_score_bonus')
      return storedScore !== null ? Number(storedScore) : 0
    })
    
    const location= useLocation()

    const navigate = useNavigate()
  
    const navigateToOriginal = () => {
      clickSound()
      setTimeout(() => {
        navigate("/")
      }, 100);
    };
    const navigateToBonus = () => {
    clickSound()
      setTimeout(() => {
        navigate("/bonus")
      }, 100);
    };

    const clickSound = () => {
      const click = new Audio("/audio/mouse-click.mp3");
      click.play();
    };
    const horrorSound = () => {
      const horror = new Audio("/audio/horror.mp3");
      horror.play()
    };
   

    useEffect(() => {
      localStorage.setItem('rps_score_bonus', score)
    }, [score])
    
    
  
  
    const HouseArray = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  
    const getResult = (player, house) => {
        if (player === house) return "TIED";
        if (
          (player === "spock" && (house === "scissors" || house === "rock")) ||
          (player === "paper" && (house === "rock" || house === "spock")) ||
          (player === "scissors" && (house === "paper" || house === "lizard")) ||
          (player === "rock" && (house === "lizard" || house === "scissors")) ||
          (player === "lizard" && (house === "spock" || house === "paper"))
        ) return "YOU WIN";
        return "YOU LOSE";
      };
      
    const WIN = (
        (playerPick === "spock" && (housePick === "scissors" || housePick === "rock")) ||
          (playerPick === "paper" && (housePick === "rock" || housePick === "spock")) ||
          (playerPick === "scissors" && (housePick === "paper" || housePick === "lizard")) ||
          (playerPick === "rock" && (housePick === "lizard" || housePick === "scissors")) ||
          (playerPick === "lizard" && (housePick === "spock" || housePick === "paper"))
    ) 
  
    const handlePick = (pick) => {
      clickSound()
      setTimeout(() => {
        setPlayerPick(pick)
      }, 200);
    }
  
    const playAgain = () => {
      setScore(score +0)
      clickSound()
      setTimeout(() => {
        setPlayerPick(null)
        setHousePick(null)
        setResult(null)
      }, 300);
    }
    
    
    const resetScore = () => {
      clickSound()
      setTimeout(() => {
        horrorSound()
        setShowModal(true);
        
      }, 700);
    };
    
    useEffect(() => {
      if (playerPick) {
        const timer = setTimeout(() => {
          const randomPick = HouseArray[Math.floor(Math.random() * HouseArray.length)]
          setHousePick(randomPick)
        }, 1000)
  
        return () => clearTimeout(timer)
      }
    }, [playerPick])
  
    useEffect(() => {
      if (housePick) {
        const timer = setTimeout(() => {
          setResult(getResult(playerPick, housePick))
        }, 1000)
        
        return () => clearTimeout(timer)
      }
    }, [housePick])
  
  
    useEffect(() => {
       const winSound = new Audio("/audio/success.mp3")
       const loseSound = new Audio("/audio/fail.mp3")
       const tieSound = new Audio("/audio/tie.mp3")
      if (result === "YOU WIN") {
          setScore(score +1)
          winSound.play()
        }
        if (result === "TIED") {
          setScore(score +0)
          tieSound.play()
        }
        if (result === "YOU LOSE") {
          setScore(score -1)
          loseSound.play()
        }
        
  
    }, [result])
    
    
    return (
      <>
        {/* Rules Modal */}
        <div className={`transition-all md:duration-300 duration-600 ease-initial 
    ${showRules ? "md:w-[28dvw] w-[100dvw]  md:h-[28dvw] h-[100dvh] z-50" : "opacity-0 pointer-events-none absolute z-0"} bg-white md:w-[28dvw] w-[100dvw]  md:h-[28dvw] h-[100dvh]  md:rounded-[1dvw] rounded-none md:py-0 py-[8dvw] md:fixed md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 flex flex-col md:justify-start justify-between items-center`}>
          
          <div className='md:w-[22dvw] md:h-[23%] w-screen h-fit flex items-center justify-between'>
            <h1 className='barlow-700 rules text-center md:w-fit w-full'>RULES</h1>
            <img className='md:visible md:w-[1.5dvw] w-0 h-fit cursor-pointer' src="/images/icon-close.svg" alt="close" onClick={() => (setShowRules(false),
              clickSound())} />
          </div>
          <div className='flex items-center justify-center md:h-[65%] h-[80%]'>
            <img src="/images/rules-bonus.svg" alt="rules-bonus" className='md:w-[18dvw] xm:w-[84dvw] w-[74dvw] h-fit mx-auto' />
          </div>
          <section className='md:!hidden !visible w-full flex justify-center'>
            <img className='md:hidden visible w-[6dvw] h-fit cursor-pointer' src="/images/icon-close.svg" alt="close" onClick={() => (setShowRules(false),
              clickSound())} />
          </section>
          
        </div>
  
        {/* Main Game Layout */}
  <div className={`z-0 min-h-screen flex flex-col items-center bg-radial ${showRules? "md:blur-md md:flex hidden" : ""} transition-all duration-100 ease-initial`}>
  
  {/* Header */}
  <header className='md:w-[52vw] w-[75vw] md:mt-[2dvw] mt-[5dvw] rounded-[1.4dvw] p-[2dvw] border border-header-outline flex justify-between items-center'>
    <img
      src="/images/logo-bonus.svg"
      alt="logo-bonus"
      className='w-[16vw] md:w-[7dvw] h-auto'
    />
    <div className='bg-white md:rounded-[0.6dvw] rounded-[1.4dvw] md:py-[1dvw] md:px-[2.5dvw] py-[3dvw] px-[5dvw] flex flex-col items-center justify-center'>
      <h4 className=' barlow-700 text-blue-700 tracking-widest leading-none'>SCORE</h4>
      <motion.span
      key={score}
      initial={{ scale: 2.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`score barlow-700 text-text-score leading-none`}>{score}</motion.span>
    </div>
  </header>
  <section className='w-full md:h-[35dvw] h-[121dvw] flex flex-col items-center justify-start'>
    <span className='flex justify-center md:gap-[6dvw] gap-[10dvw] md:mt-[2dvw] md:mb-0 mt-[15dvw] mb-[7.5dvw]'>
    <button className={`cursor-pointer barlow-600 md:tracking-widest tracking-[0.4dvw] ${location.pathname==="/"? "bg-red-700" : ""} border border-[#a8a8a8] md:rounded-[0.4dvw] rounded-[1dvw] text-white cursor-pointer md:px-[0.5dvw] md:py-[0.1dvw] px-[1dvw] py-[0.2dvw] hover:brightness-110`} onClick={navigateToOriginal}>ORIGINAL</button>

<button className={`${location.pathname==="/bonus"? "bg-red-700" : ""} border border-[#a8a8a8] md:rounded-[0.4dvw] rounded-[1dvw] text-white cursor-pointer m-auto md:px-[0.5dvw] md:py-[0.1dvw] px-[1dvw] py-[0.2dvw] barlow-600 md:tracking-widest tracking-[0.4dvw] hover:brightness-110`} onClick={navigateToBonus}>BONUS</button>
    </span>
  
  {/* Triangle Buttons Layout */}
  <div className={`${playerPick ? "hidden" : "flex flex-col"} relative md:w-[28dvw] w-[62vw]  aspect-[13/13] mx-auto  md:mt-[2dvw] mt-[0dvw]`}>
    {/* Paper - Top Left */}
    <div className='relative w-[100%] h-[65%]'>
    <span
      onClick={() => handlePick("scissors")}
      className="rounded-full hover:brightness-103 absolute top-0 left-1/2 -translate-x-[50%] -translate-y-[15%] md:-translate-y-[34%] scale-75 md:scale-33 transition-transform duration-200"
    >
      <Scissors />
    </span>
    <span
      onClick={() => handlePick("spock")}
      className="rounded-full hover:brightness-103 absolute bottom-0 left-0 -translate-x-[12%] md:-translate-x-[33%] md:translate-y-[27%] scale-75 md:scale-33 transition-transform duration-200"
    >
      <Spock />
    </span>
    <span
      onClick={() => handlePick("paper")}
      className="rounded-full hover:brightness-103 absolute bottom-0 right-0 translate-x-[12%] md:translate-x-[33%] md:translate-y-[27%] scale-75 md:scale-33 transition-transform duration-200"
    >
      <Paper />
    </span>
    </div>
    <div className='relative w-full h-[35%]'>

    <span
      onClick={() => handlePick("lizard")}
      className="rounded-full hover:brightness-103 absolute bottom-0 left-0 translate-y-[8%] translate-x-[14%] md:translate-y-[31%] md:-translate-x-[21%] scale-75 md:scale-33 transition-transform duration-200"
      >
      <Lizard />
    </span>
  
    <span
      onClick={() => handlePick("rock")}
      className="rounded-full hover:brightness-103 absolute bottom-0 right-0 translate-y-[8%] -translate-x-[14%] md:translate-y-[31%] md:translate-x-[21%] scale-75 md:scale-33 transition-transform duration-200"
      >
      <Rock />
    </span>
  </div>
        </div>
  
    
  
            {/* Result Screen */}
            <div className={`flex md:gap-0 gap-[8dvw] w-full justify-center ${playerPick ? "visible" : "hidden"} md:mt-[2dvw] mt-[0dvw]`}>
              {/* Player Picked */}
              <div className='md:w-[23dvw] md:h-[28dvw] w-[40dvw] flex md:flex-col flex-col-reverse justify-between items-center md:gap-0 gap-[8dvw]'>
                <h2 className='w-full barlow-600 text-white text-center md:tracking-[0.2dvw] tracking-[0.6dvw]'>YOU PICKED</h2>
                <span className='scale-100 md:scale-68 translate-y-[4%] transition-transform duration-200'>
                  {playerPick === "rock" && <Rock />}
                  {playerPick === "paper" && <Paper />}
                  {playerPick === "scissors" && <Scissors />}
                  {playerPick === "lizard" && <Lizard />}
                  {playerPick === "spock" && <Spock />}
                </span>
              </div>
  
              {/* Result */}
              <div className={`text-white mt-[11dvw] h-[12dvw] md:flex flex-col justify-center gap-[0.5dvw] barlow-700 tracking-widest whitespace-nowrap px-[4dvw] md:visible hidden ${result ? "w-[26dvw] animate-pop" : "w-0"}`}>
                <h1 className={`text-center tracking-wide`}>{result}</h1>
                {
                  result && (
                    <button className={`bg-white 2xl:rounded-3xl xl:rounded-lg lg:rounded-md md:rounded-sm rounded md:tracking-[0.2dvw] tracking-widest mx-auto w-[15dvw] py-[1dvw]  ${WIN? "text-black" : "text-red-700"} cursor-pointer barlow-600 ${housePick ? "visible" : "hidden"}`} onClick={playAgain}>
                      PLAY AGAIN
                    </button>
                  )
                }
                <p className={`text-gray-200 mx-auto smallText tracking-[0.1dvw]  ${result? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}> or <button className={`hover:cursor-pointer hover:text-white  text-gray-200 cursor-pointer barlow-600 underline underline-offset-2 smallText tracking-[0.11dvw]`} onClick={resetScore}>play from beginning!</button></p>
                
              </div>

              <div className={`backdrop-blur-md fixed inset-0 flex items-center justify-center z-[9990] ${showModal? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
    <div className={`z-[9999] bg-radial border-[0.22dvw] border-gray-200 text-white p-[2dvw] rounded-[0.6dvw] max-w-[30dvw] text-center barlow-600 tracking-wider ${showModal? "animate-pop" : ""}`}>
      <h2 className="text-red-500 text-[1.8dvw] font-bold mb-[1dvw]">🪦 Confirm Reset</h2>
      <p className="text-[1.1dvw] mb-[2dvw]">
        All progress goes to the grave. Want to restart?
      </p>
      <div className="flex justify-center gap-[2dvw]">
        <button
          onClick={() => {
            clickSound();
            setTimeout(() => {
              setScore(0);
              setPlayerPick(null);
              setHousePick(null);
              setResult(null);
              setShowModal(false);
            }, 300);
          }}
          className="bg-white text-black px-[2dvw] py-[0.8dvw] rounded tracking-widest hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer"
        >
          Yes, reset 💀
        </button>
        <button
          onClick={() => {
            clickSound();
            setTimeout(() => setShowModal(false), 300);
          }}
          className="bg-gray-700 text-white px-[2dvw] py-[0.8dvw] rounded tracking-wider hover:bg-gray-600 transition duration-150 ease-in-out cursor-pointer"
        >
          Cancel 😅
        </button>
      </div>
    </div>
  </div>

  
              {/* House Picked */}
              <div className='md:w-[23dvw] md:h-[28dvw] w-[40dvw] flex md:flex-col flex-col-reverse justify-between items-center md:gap-0 gap-[8dvw]'>
                <h2 className='barlow-600 text-white text-center md:tracking-[0.2dvw] tracking-[0.6dvw] w-full'>THE HOUSE PICKED</h2>
                <span className='scale-100 md:scale-68 md:translate-y-[4%] transition-transform duration-200'>
                  {playerPick && housePick === "rock" && <Rock />}
                  {playerPick && housePick === "paper" && <Paper />}
                  {playerPick && housePick === "scissors" && <Scissors />}
                  {playerPick && housePick === "lizard" && <Lizard />}
                  {playerPick && housePick === "spock" && <Spock />}
                </span>
              </div>
            </div>
            {/* Result */}
            <div className={`text-white  w-full h-[20dvw] md:mt-[15dvw] mt-[14dvw] md:hidden flex flex-col justify-center barlow-700 tracking-widest whitespace-nowrap  ${result ? "opacity-100 pointer-events-auto animate-pop" : "opacity-0 pointer-events-none animate-none"}`}>
                <h1 className={`text-center text-white tracking-wide`}>{result}</h1>
                {
                  result && (
                    <button className={`bg-white rounded-[2dvw] tracking-widest mx-auto xm:w-[50dvw] w-[46dvw] py-[3dvw]   ${WIN? "text-black" : "text-red-700"} cursor-pointer barlow-600 !text-center ${housePick ? "visible" : "hidden"}`} onClick={playAgain}>
                      PLAY AGAIN
                    </button>
                  )
                }
                <p className={`mt-[0.5dvw] text-gray-200 mx-auto smallText tracking-[0.1dvw]  ${result? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}> or <button className={`hover:cursor-pointer hover:text-white  text-gray-200  cursor-pointer barlow-600 underline underline-offset-2 smallText tracking-[0.11dvw]`} onClick={resetScore}>play from beginning!</button></p>

              </div>

              
              <div className={`backdrop-blur-md fixed inset-0 flex items-center justify-center z-[9990] ${showModal? "md:opacity-0 md:pointer-events-none opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
    <div className={`z-[9999] bg-radial border-[0.22dvw] border-gray-200 text-white p-[2dvw] rounded-[1dvw] text-center barlow-600 tracking-wider ${showModal? "animate-pop" : ""}`}>
      <h2 className="text-red-500 whitespace-nowrap text-[1.8dvw] font-bold mb-[1dvw]">🪦 Confirm Reset</h2>
      <p className="text-[1.1dvw] mb-[2dvw]">
        All progress goes to the grave. Want to restart?
      </p>
      <div className="flex justify-center gap-[2dvw]">
        <button
          onClick={() => {
            clickSound();
            setTimeout(() => {
              setScore(0);
              setPlayerPick(null);
              setHousePick(null);
              setResult(null);
              setShowModal(false);
            }, 300);
          }}
          className="bg-white text-black px-[2dvw] py-[0.8dvw] m-auto rounded-[0.7dvw] tracking-widest hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer smallText"
        >
          Yes, reset 💀
        </button>
        <button
          onClick={() => {
            clickSound();
            setTimeout(() => setShowModal(false), 300);
          }}
          className="bg-gray-700 text-white px-[2dvw] py-[0.8dvw] m-auto rounded-[0.7dvw] tracking-wider hover:bg-gray-600 transition duration-150 ease-in-out cursor-pointer smallText"
        >
          Cancel 😅
        </button>
      </div>
    </div>
  </div>

  
  </section>
          {/* Footer */}
          <footer className='w-screen flex md:justify-end justify-center md:mr-[5dvw] pb-[5dvw]'>
            <button onClick={() => (setShowRules(true), clickSound())} className='hover:brightness-120 cursor-pointer w-fit barlow-600 md:rounded-[0.4dvw] rounded-[2dvw] text-[#e6e6e6] md:tracking-[0.2dvw] tracking-[1dvw] md:py-[0.5dvw] xm:py-[3dvw] py-[1dvw] md:px-[2dvw] xm:px-[6dvw] px-[4dvw] md:border-[0.1dvw] border-[0.1px] my-auto border-[#a8a8a8]'>RULES</button>
          </footer>
            
              
      
      </div>
      </>
    )
}

export default Bonus