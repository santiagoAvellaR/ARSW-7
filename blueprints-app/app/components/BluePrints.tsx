import {Form} from '@heroui/form'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Chip } from '@heroui/chip';
import type React from 'react';
import { useState } from 'react';
import { fetchBlueprints } from '~/services/blueprintService';

interface GetBluePrintsProps {
  setBlueprints: (data: any) => void;
}


export default function GetBluePrints({ setBlueprints }: GetBluePrintsProps) {
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Llamada a la función fetchBlueprints pasando el autor
      const data = await fetchBlueprints(author);
      setBlueprints(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-[4rem]' >
      <Chip variant='light' >Author</Chip>
      <Form onSubmit={handleSubmit} >
        <Input
            className='m-2 pl-8 mr-12 sm:pl-2'
            isRequired
            errorMessage="Enter a valid author"
            name="author"
            placeholder="Enter the Author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
      <Button className='m-2 pl-8 mr-12 sm:pl-2' color='primary' variant='shadow' endContent type='submit'>
        Get blueprints
      </Button>
    </Form>
    </div>
  );
}