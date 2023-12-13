import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import Button from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
/**
 * Esto es como un contenedor padre para el componente
 */
const meta: Meta<Button> = {
  // Categorización
  title: 'Design System/Button',
  component: Button,
  // Generar auto documentación
  tags: ['autodocs'],
  // Parámetros de renderizado
  render: (args: Button) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  // Parámetros de entrada con sus valores por defecto
  argTypes: {
    label: {
      control: 'text',
      required: true,
      description: 'Label del botón',
      defaultValue: {
        summary: 'Button',
      },
    },
    primary: {
      control: 'boolean',
      description: 'Es el botón principal?',
      defaultValue: {
        summary: false,
      }
    },
    backgroundColor: {
      control: 'color',
      description: 'Color de fondo',
      defaultValue: {
        summary: null,
      }
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del botón',
      defaultValue: {
        summary: 'medium',
      }
    },
    // Evento click
    onClick: {
      action: 'click',
      description: 'Evento click',
    }
  },
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'novatec', value: '#f7f7f7' },
        { name: 'dark', value: '#333333' },
        { name: 'white', value: '#ffffff'}
      ]
    }
  },
  // Esto es como un contenedor padre para el componente
  decorators: [componentWrapperDecorator((story) => `<div style="width: 100%; height: 100%; display: grid; place-items:center;">${story}</div>`)],
};

export default meta;

type Story = StoryObj<Button>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
/** TEST  */
export const Example: Story = {
  args: {
    label: 'Button',
    size: 'medium',
    primary: false,
  },
};

/**
 * Estos son como otras instancias de Story que aparecen en la página de Storybook
 */
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
