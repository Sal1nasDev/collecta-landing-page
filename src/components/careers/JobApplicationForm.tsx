import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, CheckCircle } from "lucide-react";

interface JobApplicationFormProps {
  isOpenApplication?: boolean;
  jobTitle?: string;
}

const JobApplicationForm = ({ isOpenApplication = false, jobTitle }: JobApplicationFormProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [whyInterested, setWhyInterested] = useState("");
  const [anythingElse, setAnythingElse] = useState("");
  const [contribution, setContribution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: t('careers.form.invalidFileTitle'),
          description: t('careers.form.invalidFileMessage'),
          variant: "destructive"
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: t('careers.form.fileTooLargeTitle'),
          description: t('careers.form.fileTooLargeMessage'),
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !location.trim() || !file) {
      toast({
        title: t('careers.form.errorTitle'),
        description: t('careers.form.errorMessage'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: t('careers.form.receivedTitle'),
      description: t('careers.form.receivedMessage')
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-3">
          {t('careers.form.successTitle')}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t('careers.form.successMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t('careers.form.fullName')} *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('careers.form.fullNamePlaceholder')}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('careers.form.email')} *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('careers.form.emailPlaceholder')}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t('careers.form.location')} *</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={t('careers.form.locationPlaceholder')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>{t('careers.form.uploadCV')} *</Label>
        <div className="relative">
          {file ? (
            <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {t('careers.form.uploadPrompt')}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {t('careers.form.uploadFormats')}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {isOpenApplication ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="contribution">{t('careers.form.contribution')} *</Label>
            <Textarea
              id="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              placeholder={t('careers.form.contributionPlaceholder')}
              className="min-h-[180px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anythingElse">{t('careers.form.anythingElse')}</Label>
            <Textarea
              id="anythingElse"
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              placeholder={t('careers.form.anythingElseOpenPlaceholder')}
              className="min-h-[100px]"
            />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="whyInterested">{t('careers.form.whyInterested')}</Label>
            <Textarea
              id="whyInterested"
              value={whyInterested}
              onChange={(e) => setWhyInterested(e.target.value)}
              placeholder={`${t('careers.form.whyInterestedPlaceholder')} ${jobTitle ? t('careers.form.role') : t('careers.form.opportunity')}?`}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anythingElse">{t('careers.form.anythingElse')}</Label>
            <Textarea
              id="anythingElse"
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              placeholder={t('careers.form.anythingElsePlaceholder')}
              className="min-h-[80px]"
            />
          </div>
        </>
      )}

      <Button 
        type="submit" 
        variant="cta" 
        size="lg" 
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('careers.form.submitting') : t('careers.form.submit')}
      </Button>
    </form>
  );
};

export default JobApplicationForm;
