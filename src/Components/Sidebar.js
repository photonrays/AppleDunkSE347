import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import image from "../assets/image";
import { IconButton } from '@mui/material';
import { useMultiContext } from "../contexts/multiContext";


export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useMultiContext();

  return (
    <aside className={`fixed z-50 left-0 top-0 h-screen bg-gray-50 shrink-0 grow-0 w-full transition-all ease-in-out duration-400 block md:hidden ${isSidebarOpen ? 'ml-0 shadow-2xl' : 'ml-[-250px]'} max-w-[250px] basis-[250px]`}>
      <div className="flex items-center w-full justify-between p-5">
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          <Menu sx={{ fontSize: "30px" }} />
        </IconButton>

        <Link to={"/"} className="flex items-center text-4xl font-bold tracking-widest ">
          <img
            src={image.logo512}
            alt="logo"
            className="h-[50px] w-auto object-cover mr-2"
          />
          Apple<br />Dunk
        </Link>
      </div>
    </aside>
  );
}
