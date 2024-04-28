import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/GoogleAuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Icons } from './ui/icons';
import { Button } from './ui/button';

export function CardWithForm() {
  const { googleSignIn, user } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log('Attempting Google Sign In');

    googleSignIn().catch((error) => console.log(error));
  };

  React.useEffect(() => {
    if (user !== null) {
      return navigate('/dashboard');
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <Card className="w-[350px] h-72 flex  flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>Sign into your Account</CardTitle>
          <CardDescription>
            Create and manage notes in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full"
                  variant="outline"
                >
                  <Icons.google className="mr-2 h-4 w-4" /> Sigin with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
