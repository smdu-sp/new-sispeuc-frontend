import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import * as usuarioServices from "@/shared/services/usuario.services";
import { IUsuario } from "@/shared/services/usuario.services";
import { validaUsuario } from "@/shared/services/usuarios/usuarios.service";

export default async function RotasAdmin({children}:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const usuario: IUsuario = await validaUsuario();
  if (['USR'].includes(usuario.permissao)) redirect('/');
  return <>{children}</>;
}