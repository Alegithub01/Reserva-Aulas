<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    private $data = [];

    /**
     * Create a new message instance.
     *
     * @param string $mensaje
     * @return void
     */
    public function __construct($data){
        $this -> data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('mateovaldivia4@gmail.com', 'Mateo Valdivia')
                    ->subject($this -> data['subject'])->view('emails.index')->with('data', $this -> data);
    }
}
