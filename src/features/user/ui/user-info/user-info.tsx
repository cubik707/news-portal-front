import styles from './user-info.module.scss'
import { UserForNews } from '../../types/user.types.ts';
import { formatDateTime } from '../../../../common/utils/dateFormat.ts';

type UserInfoProps = UserForNews & {
  additionalText: string
}

export const UserInfo = ({ avatarUrl, lastName, firstName, surname, additionalText }: UserInfoProps) => {
  const fullName = lastName + ' ' + firstName + ' ' + surname;

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`${import.meta.env.VITE_API_BASE_URL}${avatarUrl}` || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        {additionalText && (
          <span className={styles.additional}>
            {formatDateTime(additionalText)}
          </span>
        )}
      </div>
    </div>
  );
};