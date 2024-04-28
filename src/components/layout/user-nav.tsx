import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/GoogleAuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function UserNav() {
  // const { logOut } = useAuth();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  if (user) {
    let fallackAvtr = `${user?.displayName
      ?.split('')[0]
      .charAt(0)} ${user?.displayName?.split('')[1].charAt(0)}`;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || ''} alt={`${fallackAvtr}`} />
              <AvatarFallback className="text-black">
                <span className="text-black dark:text-white">
                  <img src={user?.avatar} alt="..." />
                </span>
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.displayName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link className="w-full" to="/settings/account">
                Settings
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <Navigate to={'/signin'} replace={true} />
    </>
  );
}
