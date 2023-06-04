import { useNavigate } from 'react-router-dom';
import { Anchor, Collapse, Image, List, Paper, Stack, Text, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Category } from '../../../types';

const useStyles = createStyles(theme => ({
  paper: {
    alignSelf: 'start',
    padding: theme.spacing.xs,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows.sm,
    },
  },
  stack: {
    cursor: 'pointer',
    alignItems: 'center',
  },
  text: {
    fontWeight: 600,
  },
  li: {
    textAlign: 'center',
  },
  anchor: {
    color: 'black',
  },
}));

type Props = {
  category: Category;
  close: () => void;
};

export default function ModalItem({ category, close }: Props) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavigate = (categoryName: string) => {
    close();
    navigate(`/catalog/${categoryName.toLowerCase()}`);
  };

  return (
    <Paper className={classes.paper}>
      <Stack className={classes.stack} onClick={toggle}>
        <Text className={classes.text}>{category.name}</Text>
        <Image src={`${import.meta.env.VITE_SERVER_URL}/${category.image?.name}`} width={100} height={100} />
      </Stack>
      <Collapse in={opened}>
        <List listStyleType='none'>
          {category.children?.map(child => (
            <List.Item key={child.id} className={classes.li}>
              <Anchor className={classes.anchor} onClick={() => handleNavigate(child.name)}>
                {child.name}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}
