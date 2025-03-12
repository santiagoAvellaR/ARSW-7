import {Form} from '@heroui/form'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Chip } from '@heroui/chip';

export default function GetBluePrints() {
  return (
    <div className='flex items-center gap-[4rem]' >
      <Chip variant='light' >Author</Chip>
      <Form >
      <Input className='m-2 pl-8 mr-12 sm:pl-2'
        isRequired
        errorMessage="Enter a valid author  "
        name="author"
        placeholder="Enter the Author"
        type="text"
      />
    </Form>
      <Button color='primary' variant='shadow' endContent type='submit'>
        Get blueprints
      </Button>
    </div>
  );
}