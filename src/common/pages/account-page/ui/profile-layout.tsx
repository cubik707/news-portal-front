import { UserProfile } from '../../../../features/userProfile/ui/user-profile.tsx';
import { ChangeRequestForm } from '../../../../features/userProfile/ui/change-request-form.tsx';

/*const dummyUser = {
  id: 1,
  username: 'lolkek',
  lastName: 'Иванов',
  firstName: 'Иван',
  surname: 'Иванович',
  email: 'ivan@example.com',
  department: 'ИТ',
  position: 'Разработчик',
};*/

const ProfileLayout = () => {
  return (
    <>
      <UserProfile />
      <ChangeRequestForm onSubmit={(data) => alert(JSON.stringify(data))} />
    </>
  );
};

export default ProfileLayout;