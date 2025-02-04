'use client';
import { useTranslations } from 'next-intl';

import FormFieldComponent, {
  type ConfigFormField,
} from '@/components/forms/form-field';
import Spinner from '@/components/icons/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateLocation } from '@/hooks/use-location';
import useZodForm from '@/hooks/use-zod-form';
import { handleErrorApi } from '@/lib/utils';
import {
  type LocationFormType,
  LocationSchema,
} from '@/schemas/location.schema';

const configFormFields: ConfigFormField<typeof LocationSchema>[] = [
  {
    name: 'tenViTri',
    required: true,
    isShow: true,
    type: 'text',
  },
  {
    name: 'tinhThanh',
    required: true,
    isShow: true,
    type: 'text',
  },
  {
    name: 'quocGia',
    required: true,
    isShow: true,
    type: 'text',
  },
  {
    name: 'hinhAnh',
    required: false,
    isShow: true,
    type: 'file',
  },
] as const;

const ROLE_KEYS = ['admin', 'user'] as const;

export default function CreateLocationForm() {
  const t = useTranslations();
  const { mutateAsync: create, isPending } = useCreateLocation();

  const form = useZodForm(LocationSchema, {
    defaultValues: {
      tenViTri: '',
      tinhThanh: '',
      quocGia: '',
      hinhAnh: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LocationFormType) {
    try {
      console.log('🚀 ~ onSubmit ~ values:', values);
      await create(values);
    } catch (error) {
      handleErrorApi(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        {configFormFields.map((item) => (
          <FormFieldComponent
            key={item.name}
            form={form}
            config={{
              ...item,
              label: t(`ui.inputs.${item.name}.label`),
              placeholder: t(`ui.inputs.${item.name}.placeholder`),
              options:
                item.optionsVal &&
                ROLE_KEYS.map((key) => {
                  return {
                    value: item.optionsVal ? item.optionsVal[key] : '',
                    label: t(`ui.inputs.role.options.${key}`),
                  };
                }),
            }}
          />
        ))}

        <Button
          type='submit'
          disabled={isPending}
          className='hover:bg-linear w-full bg-[#FF385C] transition-colors'
        >
          {isPending ? (
            <>
              <Spinner />
              {t('ui.buttons.submitting')}
            </>
          ) : (
            <>{t('ui.buttons.add', { name: 'location' })}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
