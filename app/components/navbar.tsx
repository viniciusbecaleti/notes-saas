import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="flex h-[10vh] items-center border-b bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Notes<span>Saas</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            {(await isAuthenticated()) && (
              <LogoutLink>
                <Button>Sair</Button>
              </LogoutLink>
            )}

            {!(await isAuthenticated()) && (
              <>
                <LoginLink>
                  <Button>Entre</Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="secondary">Crie sua conta</Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
