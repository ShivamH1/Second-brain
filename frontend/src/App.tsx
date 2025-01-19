import { Button } from "./components/ui/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div>
      <Button
        title="Hello"
        size="lg"
        variant="primary"
        startIcon={<PlusIcon size="lg" />}
        endIcon={<ShareIcon size="lg" />}
      />
    </div>
  );
}

export default App;
