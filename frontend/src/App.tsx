import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        variant="primary"
        text="Add Content" 
        startIcon={<PlusIcon />}       
      />
      <Button
        variant="secondary"
        text="Share Brain"
        startIcon={<ShareIcon />}
      />
      <Card />
    </>
  );
}

export default App;
