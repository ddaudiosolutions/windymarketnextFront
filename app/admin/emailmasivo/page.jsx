'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { enviarEmailMasivo } from '@/reduxLib/slices/usersSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminEmailMasivoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const usuario = useSelector((state) => state.users.user);

  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!usuario?.isAdmin) {
      router.replace('/');
    }
  }, [usuario, router]);

  if (!usuario?.isAdmin) return null;

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (!subject.trim() || !html.trim()) return;

    setStatus(mode === 'sendPreview' ? 'loading-preview' : 'loading-pro');
    setErrorMsg('');

    const result = await dispatch(enviarEmailMasivo({ subject, html, mode }));

    if (enviarEmailMasivo.fulfilled.match(result)) {
      setStatus(mode === 'sendPreview' ? 'ok-preview' : 'ok-pro');
      if (mode === 'sendPro') {
        setSubject('');
        setHtml('');
      }
    } else {
      setStatus('error');
      setErrorMsg(result.payload || 'Error al enviar el email masivo.');
    }
  };

  return (
    <div className='main-container my-4 p-4 max-w-2xl'>
      <h2 className='font-bold text-2xl font-saira mb-1'>Panel — Email Masivo</h2>
      <p className='text-gray-500 text-sm mb-6'>
        Envía un email a todos los usuarios registrados. Usa{' '}
        <code className='bg-gray-100 px-1 rounded text-xs'>{'{{{contact.first_name}}}'}</code> en el
        HTML y Resend lo sustituirá por el nombre real de cada contacto.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className='space-y-5'>
        {/* Asunto */}
        <div>
          <Label htmlFor='subject' className='mb-1'>
            Asunto
          </Label>
          <Input
            id='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder='Ej: Novedades en WindyMarket'
            required
          />
        </div>

        {/* HTML */}
        <div>
          <Label htmlFor='html' className='mb-1'>
            Cuerpo del email (HTML)
          </Label>
          <textarea
            id='html'
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder={'<p>Hola {{{contact.first_name}}},</p>\n<p>Tenemos novedades para ti...</p>'}
            required
            rows={12}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y'
          />
          <p className='text-xs text-gray-400 mt-1'>
            Escribe HTML válido. Usa{' '}
            <code className='bg-gray-100 px-1 rounded'>{'{{{contact.first_name}}}'}</code> para el
            nombre — lo sustituye Resend automáticamente.
          </p>
        </div>

        {/* Preview rápido */}
        {html.trim() && (
          <div>
            <p className='text-xs font-medium text-gray-500 mb-1'>Vista previa</p>
            <div
              className='border rounded-md p-4 bg-white text-sm overflow-auto max-h-64'
              dangerouslySetInnerHTML={{ __html: html.replace(/\{\{\{contact\.first_name\}\}\}/g, 'WindySurfer') }}
            />
          </div>
        )}

        {/* Feedback */}
        {status === 'ok-preview' && (
          <p className='text-green-600 font-medium text-sm'>
            ✅ Preview enviado a los usuarios demo.
          </p>
        )}
        {status === 'ok-pro' && (
          <p className='text-green-600 font-medium text-sm'>
            ✅ Broadcast enviado a todos los usuarios.
          </p>
        )}
        {status === 'error' && (
          <p className='text-red-600 font-medium text-sm'>❌ {errorMsg}</p>
        )}

        {/* Botones */}
        <div className='flex gap-3'>
          <Button
            type='button'
            onClick={(e) => handleSubmit(e, 'sendPreview')}
            disabled={['loading-preview', 'loading-pro'].includes(status) || !subject.trim() || !html.trim()}
            className='bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50'
          >
            {status === 'loading-preview' ? 'Enviando preview...' : 'Enviar preview (demo)'}
          </Button>
          <Button
            type='button'
            onClick={(e) => {
              Swal.fire({
                title: '¿Enviar a todos los usuarios?',
                text: 'Se enviará el email a toda la lista de contactos registrados.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, enviar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) handleSubmit(e, 'sendPro');
              });
            }}
            disabled={['loading-preview', 'loading-pro'].includes(status) || !subject.trim() || !html.trim()}
            className='bg-windy-cyan hover:bg-windy-cyan/90 text-white disabled:opacity-50'
          >
            {status === 'loading-pro' ? 'Enviando...' : 'Enviar a todos los usuarios'}
          </Button>
        </div>
      </form>
    </div>
  );
}
