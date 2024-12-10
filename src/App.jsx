import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Selection from './pages/Selection';
import Confirmation from './pages/Confirmation';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function App() {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants} initial="initial"
                animate="animate"
                exit="exit"
              >
                <Landing />
              </motion.div>
            } />

          <Route
            path="/selection"
            element={
              <motion.div
                variants={pageVariants} initial="initial"
                animate="animate"
                exit="exit"
              >
                <Selection />
              </motion.div>
            }
          />

          <Route
            path="/confirmation"
            element={
              <motion.div
                variants={pageVariants} initial="initial"
                animate="animate"
                exit="exit"
              >
                <Confirmation />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;