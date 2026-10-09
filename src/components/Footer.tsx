
const FooterPage = () => {
  return (
    <footer className="mt-10 border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm font-bold text-gray-700">
          🛒 বাজার দর
          <span className="font-medium text-gray-500"> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </p>

        <p className="max-w-md text-xs text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;