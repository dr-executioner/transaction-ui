import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Webhook UI</h1>
      <TransactionForm />
      {/* You can add TransactionList or detail fetching components here */}
    </div>
  );
}

export default App;
