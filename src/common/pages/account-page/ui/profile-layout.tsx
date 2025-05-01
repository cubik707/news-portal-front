import { UserProfile } from '../../../../features/userProfile/ui/user-profile.tsx';
import { ChangeRequestForm } from '../../../../features/userProfile/ui/change-request-form.tsx';
import { useUser } from '../../../context/user-context.tsx';
import { UserRole } from '../../../../features/user/types/user-role.enum.ts';


const ProfileLayout = () => {
  const { user, isLoading } = useUser();

  const isAdmin = user?.roles.includes(UserRole.ADMIN);

  return (
    <>
      <UserProfile user={user} isLoading={isLoading} isAdmin={isAdmin} />
      {!isAdmin && (
        <ChangeRequestForm onSubmit={(data) => alert(JSON.stringify(data))} />
      )}
    </>
  );
};

export default ProfileLayout;